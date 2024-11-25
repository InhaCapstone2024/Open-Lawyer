import { useQuery } from '@tanstack/react-query';

const Example = () => {
  const {
    isLoading: isRepoLoading,
    error: repoError,
    data: repoData,
  } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch('https://api.github.com/repos/TanStack/query').then((res) =>
        res.json()
      ),
  });

  if (isRepoLoading) return 'Loading...'; // Loading state handling
  if (repoError)
    return 'An error has occurred with GitHub API: ' + repoError.message;

  return (
    <>
      <h1>Response from GitHub API</h1>
      <pre>{JSON.stringify(repoData, null, 2)}</pre>
    </>
  );
};

export default Example;
