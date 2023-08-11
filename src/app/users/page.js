'use client'
import React, { useState, useEffect } from "react";
import Link from "next/link";
import getUsers from "../../../services/getUsers";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
} from "@mui/material";

export default function Page() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items to display per page
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      const userList = await getUsers();
      setUsers(userList);
    }
    fetchUsers();
  }, []);

  const containerStyle = {
    margin: "20px auto",
    width: "100%", 
    height: "90vh", 
  };

  const tableHeaderStyle = {
    backgroundColor: "#f2f2f2",
    padding: "30px",
    textAlign: "left",
    fontWeight: 900,
    color: "black", 
    fontSize:18,

  };

  const userLinkStyle = {
    color: "#007bff",
    textDecoration: "none",
    fontWeight:900,
    
  };

  const userLinkHoverStyle = {
    textDecoration: "underline",
  };
  const filteredUsers = users.filter((user) =>
  user.name.toLowerCase().includes(searchTerm.toLowerCase())
);

  // Pagination
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentUsers = users.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1)
    .slice(0, 10); // Show up to 10 page numbers

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  // Filtering
  
  return (
    <div className="user-list-container">
      <h1 className="h11" style={{ textAlign: "center" }}>
        Collections
      </h1>
      <TextField
        label="Search by Name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ margin: "10px" }}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
          <TableRow>
              <TableCell style={tableHeaderStyle}>Name</TableCell>
              <TableCell style={tableHeaderStyle}>Blockchain</TableCell>
              <TableCell style={tableHeaderStyle}>Structure</TableCell>
              <TableCell style={tableHeaderStyle}>Types</TableCell>
              <TableCell style={tableHeaderStyle}>Status</TableCell>
              <TableCell style={tableHeaderStyle}>Symbol</TableCell>
              <TableCell style={tableHeaderStyle}>Owner</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentUsers.map((user) => (
              <TableRow key={user.id}>
               <TableCell>
                  <Link href={`/users/${user.id}`} style={userLinkStyle}>
                    {user.name}
                  </Link>
                </TableCell>
                <TableCell>{user.blockchain}</TableCell>
                <TableCell>{user.structure}</TableCell>
                <TableCell>{user.type}</TableCell>
                <TableCell>{user.status}</TableCell>
                <TableCell>{user.symbol}</TableCell>
                <TableCell>{user.owner}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ display: "flex", justifyContent: "center", margin: "10px" }}>
        {pageNumbers.map((pageNum) => (
          <Button
            key={pageNum}
            onClick={() => handlePageChange(pageNum)}
            style={{ margin: "2px" }}
            disabled={currentPage === pageNum}
          >
            {pageNum}
          </Button>
        ))}
      </div>
    </div>
  );
}
