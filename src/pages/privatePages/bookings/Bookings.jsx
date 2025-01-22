import Table from "@components/Table";
import { useState } from "react";

const Bookings = () => {
  const data = [
    { id: 1, name: 'John Doe', age: 28, date: '2025-01-01T12:00:00.000Z' },
    { id: 2, name: 'Jane Smith', age: 34, date: '2025-01-02T12:00:00.000Z' },
    { id: 3, name: 'Emily Johnson', age: 25, date: '2025-01-03T12:00:00.000Z' },
    { id: 4, name: 'Emily Johnson', age: 25, date: '2025-01-03T12:00:00.000Z' },
    { id: 5, name: 'Emily Johnson', age: 25, date: '2025-01-03T12:00:00.000Z' },
    { id: 6, name: 'Emily Johnson', age: 25, date: '2025-01-03T12:00:00.000Z' },
    { id: 7, name: 'Emily Johnson', age: 25, date: '2025-01-03T12:00:00.000Z' },
    { id: 8, name: 'Emily Johnson', age: 25, date: '2025-01-03T12:00:00.000Z' },
    { id: 9, name: 'Emily Johnson', age: 25, date: '2025-01-03T12:00:00.000Z' },
    { id: 10, name: 'Emily Johnson', age: 25, date: '2025-01-03T12:00:00.000Z' },
    { id: 11, name: 'Emily Johnson', age: 25, date: '2025-01-03T12:00:00.000Z' },
    { id: 12, name: 'Emily Johnson', age: 25, date: '2025-01-03T12:00:00.000Z' },
    { id: 13, name: 'Emily Johnson', age: 25, date: '2025-01-03T12:00:00.000Z' },
    { id: 14, name: 'Emily Johnson', age: 25, date: '2025-01-03T12:00:00.000Z' },
    { id: 15, name: 'Emily Johnson', age: 25, date: '2025-01-03T12:00:00.000Z' },
    { id: 16, name: 'Emily Johnson', age: 25, date: '2025-01-03T12:00:00.000Z' },
    { id: 17, name: 'Emily Johnson', age: 25, date: '2025-01-03T12:00:00.000Z' },
    { id: 18, name: 'Emily Johnson', age: 25, date: '2025-01-03T12:00:00.000Z' },
    { id: 19, name: 'Emily Johnson', age: 25, date: '2025-01-03T12:00:00.000Z' },
    { id: 20, name: 'Emily Johnson', age: 25, date: '2025-01-03T12:00:00.000Z' },
    { id: 21, name: 'Emily Johnson', age: 25, date: '2025-01-03T12:00:00.000Z' },
    { id: 22, name: 'Emily Johnson', age: 25, date: '2025-01-03T12:00:00.000Z' },
    { id: 23, name: 'Emily Johnson', age: 25, date: '2025-01-03T12:00:00.000Z' },
    { id: 24, name: 'Emily Johnson', age: 25, date: '2025-01-03T12:00:00.000Z' },
    { id: 25, name: 'Emily Johnson', age: 25, date: '2025-01-03T12:00:00.000Z' },
    { id: 26, name: 'Emily Johnson', age: 25, date: '2025-01-03T12:00:00.000Z' },
    { id: 27, name: 'Emily Johnson', age: 25, date: '2025-01-03T12:00:00.000Z' },
    { id: 28, name: 'Emily Johnson', age: 25, date: '2025-01-03T12:00:00.000Z' },
    
  ];

  const columns = [
    { key: 'name', header: 'Name' },
    { key: 'age', header: 'Age' },
    {
      key: 'date',
      header: 'Date',
      render: (value) => <span>{new Date(value).toLocaleDateString()}</span>,
    },
  ];

  const keyExtractor = (row) => row.id;

  const onPageChange = (page) => {
    setCurrentPage(page);
  };


    // Pagination
    

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(7);
    const totalPages = Math.ceil(data.length / pageSize);
  
    const paginatedData = data.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize,
    );








  return (
    <div>
      <h1>My Data Table</h1>
      <Table
        data={paginatedData}
        columns={columns}
        keyExtractor={keyExtractor}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  )
}

export default Bookings