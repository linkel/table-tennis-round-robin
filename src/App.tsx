import * as React from "react";
import "./App.css";
import * as XLSX from "xlsx";
import Editor from "./Editor";


export default function App() {
  const [data, setData] = React.useState<string>('');

  const onChange = (e: any) => {
    const [file] = e.target.files;
    const reader = new FileReader();

    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      // @ts-ignore - sorry! header exists I'm sure...
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      setData(data);
      console.log(data);
    };
    reader.readAsBinaryString(file);
  };
  return (
    <div>
      <input type="file" onChange={onChange} />
      <Editor data={data}/>
      Hello World Test
    </div>
  );
}