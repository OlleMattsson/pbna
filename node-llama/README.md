Docs
https://withcatai.github.io/node-llama-cpp/

Github
https://github.com/withcatai/node-llama-cpp/

## installation

`npm install`
`npx --no node-llama-cpp download`

download model: https://huggingface.co/TheBloke/Llama-2-13B-GGUF/blob/main/llama-2-13b.Q5_K_M.gguf

place model in: ./models/llama-2-13b.Q5_K_M.gguf

The setup possibly works with smaller quantized models as well, eg. https://huggingface.co/TheBloke/Llama-2-13B-GGUF/blob/main/llama-2-13b.Q4_K_M.gguf
But this is untested.


## trouble shooting

### core dumped error
Try `npx --no node-llama-cpp download` to update llama.cpp to latest version