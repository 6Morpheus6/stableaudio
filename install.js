module.exports = {
  requires: {
    bundle: "ai",
  },
  run: [
    {
      method: "shell.run",
      params: {
        message: [
          "git clone https://github.com/peanutcocktail/stable-audio-tools app",
        ]
      }
    },
    {
      method: "script.start",
      params: {
        uri: "torch.js",
        params: {
          venv: "env",
          path: "app",
          // xformers: true
        }
      }
    },
    {
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: [
          "uv pip install gradio devicetorch soxr hf-xet",
          "uv pip install ."
        ]
      }
    },
    {
      when: "{{platform === 'darwin' && arch === 'arm64'}}",
      method: "shell.run",
      params: {
        path: "app",
        conda: "conda_env",
        message: "conda install -y -c conda-forge libsndfile",
      }
    },
    // libsndfile.dylib handling
    {
      when: "{{platform === 'darwin' && arch === 'arm64'}}",
      method: "fs.copy",
      params: {
        src: "{{path.resolve(cwd, 'app/conda_env/lib/libsndfile.dylib')}}",
        dest: "{{path.resolve(cwd, 'app/env/lib/python3.10/site-packages/_soundfile_data/libsndfile.dylib')}}",
      }
    },
    {
      method: "notify",
      params: {
        html: "Click the 'start' tab to get started!"
      }
    }
  ]
}
