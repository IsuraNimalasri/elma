import { createClient } from "@prismicio/client";

export const repositoryName = "cognito-clone-elma";

export const createPrismicClient = (config = {}) => {
  const client = createClient(repositoryName, {
    ...config,
  });

  return client;
};

