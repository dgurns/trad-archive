const cleanName = (rawName: string) => {
  // Remove any character that is not a letter or space
  return rawName.replace(/[^a-zA-Z\s]/g, '').toLowerCase();
};

const RelationshipService = {
  cleanName,
};
export default RelationshipService;
