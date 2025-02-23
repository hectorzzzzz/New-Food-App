//file to define the data types for route parameter

export interface RestContext {
    params: Promise<Record<string, string[]>>;
  }