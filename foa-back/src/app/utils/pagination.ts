//file to manage pagination (page)

import type { Model, RootFilterQuery } from 'mongoose';

export async function getPaginatedItems<T extends Model<any>>(
  Entity: T,
  options: {
    filter?: RootFilterQuery<any>;
    page?: number;
    limit?: number;
  },
) {
  try {
    const { filter = {}, page, limit = 10 } = options;
    const skip = page ? (page - 1) * limit : -1;

    // Fetch the paginated results
    let query = Entity.find(filter).sort({ createdAt: -1 });

    if (skip >= 0) {
      query = query.skip(skip).limit(limit);
    }

    const items = await query;
    const totalDocuments = await Entity.find(filter).countDocuments();

    return {
      items,
      totalDocuments,
      totalPages: Math.ceil(totalDocuments / limit),
      currentPage: page,
    };
  } catch (error) {
    console.error('Error fetching paginated items:', error);
    throw error;
  }
}