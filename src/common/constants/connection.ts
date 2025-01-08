export type Connection = {
  CONNECTION_STRING: string;
  DB: string;
  DBNAME: string;
};

export const connection: Connection = {
  CONNECTION_STRING: 'mysql://root:root@localhost:3306',
  DB: 'MYSQL',
  DBNAME: 'TEST',
};
