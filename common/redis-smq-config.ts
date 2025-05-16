// set this to true when running anything dependent on redis locally
// set to false when running in the container

export const config = {
    redis: {
        client: "redis_v4",
        options: {
            socket: {
                host:"redis"
            }
        }
    }   
 }

 export const queueNames = {
    llamaDataExtraction: "llama-data-extraction",
    tesseract: "tesseract",
    emailverifyer: "emailverifyer"
 }

 export default { config, queueNames };