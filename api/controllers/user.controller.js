export function test (req, res) {
    res.json({msg : "API route is working!"});
}

export async function update(req, res, next) {
    try{

    }
    catch(err){
        next(err);
    }
}