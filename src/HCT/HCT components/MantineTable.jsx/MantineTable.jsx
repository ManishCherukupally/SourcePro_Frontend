import React, { useEffect, useMemo, useState } from 'react'
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { Card, Flex, Pagination, Space, Table } from '@mantine/core';
const MantineTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;

  useEffect(() => {
    console.log(currentPage)
  }, [currentPage])

  const data = [
    {
      id: 5,
      name: "shruthi",
      contact_no: 987654321,
      user_status: "inactive",
      company: "Sourcepro",
      business_email: "shruthiwork.21@gmail.com",
      years_of_experience: 1,
      job_position: "xyz",
      location: "Hyderabad",
      otp: null,
      course_id: null,
      user_id: 7,
      date_joined: "2024-01-31T06:33:56Z"
    },
    {
      id: 4,
      name: "sachin_pilwan",
      contact_no: 123456789,
      user_status: "inactive",
      company: "sourcepro",
      business_email: "sachin_pilwan@keyresourcing.com",
      years_of_experience: 0,
      job_position: "xyz",
      location: "Hyderabad",
      otp: "271078",
      course_id: 1,
      user_id: 6,
      date_joined: "2024-01-30T07:36:55Z"
    }
  ];

  const records = data.slice(firstIndex, lastIndex);

  const nPages = Math.ceil(data.length / recordsPerPage)
  const numbers = [...Array(nPages + 1).keys()].slice(1)

  //should be memoized or stable
  // const columns = useMemo(
  //   () => [
  //     {
  //       accessorKey: 'name.firstName', //access nested data with dot notation
  //       header: 'First Name',
  //     },
  //     {
  //       accessorKey: 'name.lastName',
  //       header: 'Last Name',
  //     },
  //     {
  //       accessorKey: 'address', //normal accessorKey
  //       header: 'Address',
  //     },
  //     {
  //       accessorKey: 'city',
  //       header: 'City',
  //     },
  //     {
  //       accessorKey: 'state',
  //       header: 'State',
  //     },
  //   ],
  //   [],
  // );

  // const table = useMantineReactTable({
  //   columns,
  //   data, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
  // });
  const rows = data.map((item) => (
    <tr key={item.id}>
      <td>{item.user_status}</td>
      <td>{item.name}</td>
      <td>{item.contact_no}</td>
      <td>{item.business_email}</td>
      <td>{item.date_joined}</td>
      <td>{item.location}</td>
      <td>Edit Delete</td>
    </tr>
  ))
  return (
    <div>
      {/* <MantineReactTable columns={columns} data={data} enableSorting={true} selectDisplayMode='radio'
        positionToolbarDropZone='bottom'
        paginationDisplayMode='pages'
        enableGlobalFilterModes={true}
        enableTopToolbar={true}
        enableFilters /> */}

      <Card withBorder>
        <Table>
          <thead>
            <tr>
              <th> Status </th>
              <th> User name </th>
              <th> Contact no. </th>
              <th> Email </th>
              <th> Date of joining </th>
              <th> Location </th>
              <th> Action </th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
        <Space h={"xl"} />
        <Flex justify={"end"}>
          <Pagination value={currentPage} onChange={setCurrentPage} total={10} />
        </Flex>
      </Card>
    </div>
  )
}

export default MantineTable



