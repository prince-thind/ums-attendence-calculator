export default function FileUpload({ setConfig }) {
  return (
    <form className="upload-form" onSubmit={uploadConfig}>
      <fieldset>
        <input type="file" name="config" required />
        <button>Upload Config</button>
      </fieldset>
    </form>
  );

  async function uploadConfig(e) {
    e.preventDefault();
    const fileGlob = e.target.config.files[0];
    const text = await fileGlob.text();
    const json = JSON.parse(text);
    setConfig(json);
    alert("config set successfully");
  }
}
