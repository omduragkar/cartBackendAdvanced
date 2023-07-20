module.exports.response = (response, status, message, data, error=false)=>{
    if(error)
    {
        response.status(status).json({
            error:data,
            errorMessage:message,
            error:true
        })

    }else{
        response.status(status).json({
            data,
            message
        })
    }
}