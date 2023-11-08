import { ReactNode } from "react";

type TableColumn<T, K extends keyof T> = {
  key: K;
  header: string;
  render?: (value: T[K]) => ReactNode;
};

type TableProps<T> = {
  data: T[];
  columns: TableColumn<T, keyof T>[];
};

const Table = <T extends Record<string, number | string | boolean>>({
  data,
  columns,
}: TableProps<T>) => {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          {columns.map(({ key, header }) => (
            <th key={String(key)}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr
            key={String(row + Math.random().toString())}
            className={
              rowIndex % 2 === 0
                ? "bg-slate-400 opacity-70 text-black text-center"
                : "bg-slate-50 opacity-90 text-black text-center"
            }
          >
            {columns.map(({ key, render }) => (
              <td key={String(key)}>{render ? render(row[key]) : row[key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
