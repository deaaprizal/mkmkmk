import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../../utils/db_connect';
import create from '../../../../utils/services/user_projects/create';
import deleteFunction from '../../../../utils/services/user_projects/delete';
import get_data from '../../../../utils/services/user_projects/get_data';
import update from '../../../../utils/services/user_projects/update';
import get_data_by_key from '../../../../utils/services/user_projects/get_data';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        switch (req.method) {
            case 'POST':
                    await create(req.body, res);
                break;
            case 'GET':
                    if (req.headers.action == 'get_detail') {
                        await get_data(req.headers, res);
                    } else {
                        await get_data_by_key(req.headers, res);
                    }
                break;
            case 'PUT':
                    await update(req.body, res);
                break;
            case 'DELETE':
                    await deleteFunction(req.body, res);
                break;
            default :
                    res.status(500).json({ 
                        status: 500, 
                        message: 'Ilegal Activity' 
                    });
                break;
        }

    } catch (err: any) {
        return res.status(400).json({ 
            status: 400, 
            message: err.message 
        });
    }
}

export default connectDB(handler);
