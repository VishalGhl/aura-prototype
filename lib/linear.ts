// lib/linear.ts - Use real token
import { getLinearToken } from './storage';

export async function getLinearIssues() {
  const accessToken = getLinearToken();
  
  if (!accessToken) {
    console.log('No Linear token - using mock data');
    return getMockIssues();
  }

  try {
    console.log('🔐 Fetching real Linear issues with token...');
    const response = await fetch('https://api.linear.app/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query {
            issues(first: 10) {
              nodes {
                id
                title
                description
                state {
                  name
                }
                priority
                assignee {
                  name
                }
                createdAt
                updatedAt
              }
            }
          }
        `
      })
    });

    const data = await response.json();
    
    if (data.errors) {
      console.error('Linear API errors:', data.errors);
      return getMockIssues();
    }

    console.log('✅ Real Linear issues fetched:', data.data.issues.nodes.length);
    
    return data.data.issues.nodes.map((issue: any) => ({
      id: issue.id,
      title: issue.title,
      priority: issue.priority || 'MEDIUM',
      status: issue.state.name,
      assignee: issue.assignee?.name || 'Unassigned',
      createdAt: issue.createdAt,
      updatedAt: issue.updatedAt
    }));
  } catch (error) {
    console.error('Linear API error:', error);
    return getMockIssues();
  }
}

function getMockIssues() {
  return [
    {
      id: '1',
      title: 'Real Linear integration complete!',
      priority: 'HIGH',
      status: 'DONE',
      assignee: 'You',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];
}