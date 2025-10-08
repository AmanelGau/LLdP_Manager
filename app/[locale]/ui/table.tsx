"use client";

import { useI18n } from "@/app/local/client";
import clsx from "clsx";

interface Props {
  headers: { [key: string]: string };
  data: { [key: string]: any }[];
  rowClassName?: (data: { [key: string]: string | number | null }) => string;
}

const Row = ({
  className,
  el,
  index,
  headers,
}: {
  className?: string;
  el: { [key: string]: any };
  index: number;
  headers: { [key: string]: string };
}) => {
  return (
    <tr key={`row-${index}`} className={clsx("h-10", className)}>
      {Object.keys(headers).map((key) => (
        <td className="w-full" key={`item-${index}-${key}`}>
          {el[key]}
        </td>
      ))}
    </tr>
  );
};

const Table = ({ headers, data, rowClassName }: Props) => {
  return (
    <table className="table-fixed w-full divide-solid">
      <thead className="border-b-1 h-10">
        <tr>
          {Object.values(headers).map((header, index) => (
            <th key={`header-${index}`}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y-1 divide-solid divide-content1 text-center">
        {data.map((el, index) => (
          <Row
            key={index}
            headers={headers}
            el={el}
            index={index}
            className={rowClassName && rowClassName(el)}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
