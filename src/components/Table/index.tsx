// react Lib imports
import React from 'react';

import { ITableProps } from './table';

// styles
import './table.scss';

/**
 * This component displays a table with props data and configurations
 *
 * @class Table
 */
const Table = ({ config, headers, data, onClick }: ITableProps) => {
  /**
   *  Renders Table headers
   *
   * @returns {JSX} JSX
   */
  const renderTableHeader = () => {
    return (
      <div className="table-row table-header">
        {headers.map((header:any) => (
          <span
            key={header}
            className={`${config[header].width || 'table-col'}`}
          >
            {config[header].alias ? config[header].alias : header}
          </span>
        ))}
      </div>
    );
  };

  /**
   * Renders Table Body
   *
   * @returns {JSX} JSX
   */
  const renderTableBody = () => {
    const updatedData = data.map((item: any, index: number) => {
      item['serial'] = index + 1;
      return item;
    });

    return (
      <div>
        {updatedData && updatedData.map((row: any, id: any) => (
          <button type="button" onClick={() => onClick(row)} className="btn">
            <div className="table-row" key={id}>
              {headers.map((header:any) => (
                <span
                  className={`${config[header].width || 'table-col'}`}
                  key={header}
                >
                  {row[header]}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="table-wrapper">
      {renderTableHeader()}
      {renderTableBody()}
    </div>
  );
};

export default Table;