type Theme = {
  category: string,
  facts: string[],
  images: string[],
  themeid: string,
};

type User = {
  userid: string,
  name: string,
  saved: [],
};

type UserItem = {
  id: string,
  category: string,
  fact: string,
  image: string,
  themeid: string,
};


export type { Theme, User, UserItem };