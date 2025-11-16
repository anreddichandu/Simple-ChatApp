import React from "react";

const TableResponse = ({ table }) => {
  if (!table || table.length === 0) return null;
  
  const headers = table.length > 0 ? Object.keys(table[0]) : [];

  return (
    <div className="mt-4 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {table.map((row, rowIndex) => (
              <tr 
                key={rowIndex}
                className={`${rowIndex % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800'} hover:bg-gray-50 dark:hover:bg-gray-800/70 transition-colors`}
              >
                {headers.map((header, cellIndex) => (
                  <td
                    key={`${rowIndex}-${cellIndex}`}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200"
                  >
                    {row[header]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableResponse;
