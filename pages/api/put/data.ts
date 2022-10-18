// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {Repository} from "../../../public/repositories/repository"

let repo = new Repository();

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
    let newData = JSON.stringify(req.body)
    repo.writeData(newData)
}