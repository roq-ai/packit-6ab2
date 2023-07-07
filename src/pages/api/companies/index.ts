import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { companyValidationSchema } from 'validationSchema/companies';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getCompanies();
    case 'POST':
      return createCompany();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getCompanies() {
    const data = await prisma.company
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'company'));
    return res.status(200).json(data);
  }

  async function createCompany() {
    await companyValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.catalog?.length > 0) {
      const create_catalog = body.catalog;
      body.catalog = {
        create: create_catalog,
      };
    } else {
      delete body.catalog;
    }
    if (body?.project?.length > 0) {
      const create_project = body.project;
      body.project = {
        create: create_project,
      };
    } else {
      delete body.project;
    }
    if (body?.resource?.length > 0) {
      const create_resource = body.resource;
      body.resource = {
        create: create_resource,
      };
    } else {
      delete body.resource;
    }
    if (body?.review?.length > 0) {
      const create_review = body.review;
      body.review = {
        create: create_review,
      };
    } else {
      delete body.review;
    }
    if (body?.supplier?.length > 0) {
      const create_supplier = body.supplier;
      body.supplier = {
        create: create_supplier,
      };
    } else {
      delete body.supplier;
    }
    const data = await prisma.company.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
