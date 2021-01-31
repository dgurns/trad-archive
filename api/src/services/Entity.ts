const cleanSlug = (rawSlug: string) => {
  return rawSlug.replace(/[^a-zA-Z0-9-]/g, '').toLowerCase();
};

const EntityService = {
  cleanSlug,
};
export default EntityService;
