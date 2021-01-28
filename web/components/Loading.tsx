const Loading = () => (
  <div className="flex flex-col justify-start items-start">
    <div className="flex h-5 w-2/3 bg-gray-300 mb-4 animate-pulse" />
    <div className="flex h-12 w-full bg-gray-300 mb-4 animate-pulse" />
    <div className="flex h-5 w-5/12 bg-gray-300 mb-4 animate-pulse" />
  </div>
);

export default Loading;
