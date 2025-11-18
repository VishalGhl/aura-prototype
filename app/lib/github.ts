// lib/github.ts - GitHub API integration

export async function getGitHubNotifications(apiKey: string) {
  const mockNotifications = [
    {
      id: '1',
      title: 'PR #45 needs review',
      type: 'PULL_REQUEST',
      repository: 'aura-prototype',
      unread: true
    },
    {
      id: '2',
      title: 'Issue #23 commented',
      type: 'ISSUE', 
      repository: 'backend-api',
      unread: true
    }
  ];

  await new Promise(resolve => setTimeout(resolve, 100));
  return mockNotifications;
}