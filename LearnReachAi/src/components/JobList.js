import { useEffect, useState } from "react";

export default function JobList() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("/api/jobs") // <-- calls your backend
      .then(res => res.json())
      .then(data => setJobs(data.results || []))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Live Job Listings</h2>
      {jobs.length === 0 && <p>Loading jobs...</p>}
      {jobs.map(job => (
        <div
          key={job.id}
          style={{
            border: "1px solid gray",
            margin: "10px",
            padding: "10px"
          }}
        >
          <h3>{job.title}</h3>
          <p>
            {job.company} — {job.location || "Remote"}
          </p>
          <a href={job.url} target="_blank" rel="noopener noreferrer">
            View Job
          </a>
          <p style={{ fontSize: "12px", color: "gray" }}>Source: {job.source}</p>
        </div>
      ))}
    </div>
  );
}

// api/jobs.js
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { query = 'software engineer', location = '', page = 1, category = 'all' } = req.query;
  let allJobs = [];

  try {
    // 1. JSearch API (RapidAPI) - Most comprehensive
    if (process.env.RAPIDAPI_KEY) {
      try {
        const jsearchResponse = await fetch(
          `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(query)}&page=${page}&num_pages=1&date_posted=all`,
          {
            headers: {
              'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
              'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
            }
          }
        );
        
        if (jsearchResponse.ok) {
          const jsearchData = await jsearchResponse.json();
          const jsearchJobs = jsearchData.data?.map(job => ({
            id: `jsearch_${job.job_id}`,
            title: job.job_title,
            company: job.employer_name,
            location: `${job.job_city || ''}, ${job.job_country || ''}`.trim().replace(/^,\s*/, ''),
            salary: job.job_salary_min && job.job_salary_max 
              ? `$${job.job_salary_min} - $${job.job_salary_max}` 
              : job.job_salary_currency && job.job_salary_min
              ? `${job.job_salary_currency}${job.job_salary_min}+`
              : 'Salary not disclosed',
            description: job.job_description?.substring(0, 300) + '...',
            url: job.job_apply_link,
            workType: job.job_employment_type || 'Full-time',
            deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            skills: job.job_required_skills?.slice(0, 3) || [],
            rating: Math.floor(Math.random() * 2) + 4,
            source: 'JSearch',
            logo: job.employer_logo,
            posted_date: job.job_posted_at_datetime_utc
          })) || [];
          allJobs.push(...jsearchJobs);
        }
      } catch (error) {
        console.error('JSearch API error:', error.message);
      }
    }

    // 2. Adzuna API
    if (process.env.ADZUNA_API_ID && process.env.ADZUNA_API_KEY) {
      try {
        const adzunaResponse = await fetch(
          `https://api.adzuna.com/v1/api/jobs/us/search/${page}?app_id=${process.env.ADZUNA_API_ID}&app_key=${process.env.ADZUNA_API_KEY}&results_per_page=20&what=${encodeURIComponent(query)}&where=${encodeURIComponent(location)}`
        );
        
        if (adzunaResponse.ok) {
          const adzunaData = await adzunaResponse.json();
          const adzunaJobs = adzunaData.results?.map(job => ({
            id: `adzuna_${job.id}`,
            title: job.title,
            company: job.company.display_name,
            location: job.location.display_name,
            salary: job.salary_min && job.salary_max 
              ? `$${Math.round(job.salary_min)} - $${Math.round(job.salary_max)}` 
              : 'Salary not disclosed',
            description: job.description?.substring(0, 300) + '...',
            url: job.redirect_url,
            workType: job.contract_type || 'Full-time',
            deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            skills: [],
            rating: Math.floor(Math.random() * 2) + 4,
            source: 'Adzuna',
            posted_date: job.created
          })) || [];
          allJobs.push(...adzunaJobs);
        }
      } catch (error) {
        console.error('Adzuna API error:', error.message);
      }
    }

    // 3. Reed API (UK Jobs)
    if (process.env.REED_API_KEY) {
      try {
        const reedResponse = await fetch(
          `https://www.reed.co.uk/api/1.0/search?keywords=${encodeURIComponent(query)}&locationName=${encodeURIComponent(location)}&resultsToTake=20`,
          {
            headers: {
              'Authorization': `Basic ${Buffer.from(process.env.REED_API_KEY + ':').toString('base64')}`
            }
          }
        );
        
        if (reedResponse.ok) {
          const reedData = await reedResponse.json();
          const reedJobs = reedData.results?.map(job => ({
            id: `reed_${job.jobId}`,
            title: job.jobTitle,
            company: job.employerName,
            location: job.locationName,
            salary: job.minimumSalary && job.maximumSalary 
              ? `£${job.minimumSalary} - £${job.maximumSalary}` 
              : 'Salary not disclosed',
            description: job.jobDescription?.substring(0, 300) + '...',
            url: job.jobUrl,
            workType: job.contractType || 'Full-time',
            deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            skills: [],
            rating: Math.floor(Math.random() * 2) + 4,
            source: 'Reed',
            posted_date: job.date
          })) || [];
          allJobs.push(...reedJobs);
        }
      } catch (error) {
        console.error('Reed API error:', error.message);
      }
    }

    // 4. USAJobs API (Government Jobs)
    if (process.env.USAJOBS_API_KEY) {
      try {
        const usajobsResponse = await fetch(
          `https://data.usajobs.gov/api/search?Keyword=${encodeURIComponent(query)}&LocationName=${encodeURIComponent(location)}&ResultsPerPage=20`,
          {
            headers: {
              'Host': 'data.usajobs.gov',
              'User-Agent': 'your-email@domain.com',
              'Authorization-Key': process.env.USAJOBS_API_KEY
            }
          }
        );
        
        if (usajobsResponse.ok) {
          const usajobsData = await usajobsResponse.json();
          const usajobsJobs = usajobsData.SearchResult?.SearchResultItems?.map(item => ({
            id: `usajobs_${item.MatchedObjectId}`,
            title: item.MatchedObjectDescriptor.PositionTitle,
            company: item.MatchedObjectDescriptor.OrganizationName,
            location: `${item.MatchedObjectDescriptor.PositionLocationDisplay}`,
            salary: item.MatchedObjectDescriptor.PositionRemuneration?.[0]?.Description || 'Government Scale',
            description: item.MatchedObjectDescriptor.QualificationSummary?.substring(0, 300) + '...' || 'Government position',
            url: item.MatchedObjectDescriptor.ApplyURI?.[0] || item.MatchedObjectDescriptor.PositionURI,
            workType: item.MatchedObjectDescriptor.PositionSchedule?.[0]?.Name || 'Full-time',
            deadline: item.MatchedObjectDescriptor.ApplicationCloseDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            skills: [],
            rating: 4,
            source: 'USA Jobs',
            posted_date: item.MatchedObjectDescriptor.PublicationStartDate
          })) || [];
          allJobs.push(...usajobsJobs);
        }
      } catch (error) {
        console.error('USAJobs API error:', error.message);
      }
    }

    // Remove duplicates and sort by relevance/date
    const uniqueJobs = allJobs.reduce((acc, job) => {
      const isDuplicate = acc.some(existingJob => 
        existingJob.title.toLowerCase() === job.title.toLowerCase() && 
        existingJob.company.toLowerCase() === job.company.toLowerCase()
      );
      if (!isDuplicate) {
        acc.push(job);
      }
      return acc;
    }, []);

    // Sort by date (newest first)
    uniqueJobs.sort((a, b) => new Date(b.posted_date || b.deadline) - new Date(a.posted_date || a.deadline));

    // Limit results
    const limitedJobs = uniqueJobs.slice(0, 50);

    res.status(200).json({
      success: true,
      jobs: limitedJobs,
      total: limitedJobs.length,
      sources: [...new Set(allJobs.map(job => job.source))],
      query: query,
      location: location
    });

  } catch (error) {
    console.error('Jobs API Error:', error);
    
    // Fallback with mock data if all APIs fail
    const mockJobs = [
      {
        id: 'mock_1',
        title: 'Software Engineer',
        company: 'Tech Company',
        location: 'Remote',
        salary: '$80,000 - $120,000',
        description: 'Join our team of innovative developers...',
        url: '#',
        workType: 'Remote',
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        skills: ['React', 'Node.js', 'JavaScript'],
        rating: 4,
        source: 'Demo'
      }
    ];

    res.status(200).json({
      success: true,
      jobs: mockJobs,
      total: mockJobs.length,
      fallback: true,
      message: 'Using demo data. Please configure API keys for real results.'
    });
  }
}
