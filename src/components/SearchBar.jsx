import React, { useState } from "react";
import { Paper, InputBase, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setQuery("");
    }
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: "25px 8px",
        display: "flex",
        alignItems: "center",
        width: "100%",
        maxWidth: 1000,
        mx: "auto",
        borderRadius: 3,
        boxShadow: 3,
        "&:hover": {
          boxShadow: 6,
        },
        transition: "box-shadow 0.3s ease-in-out",
      }}
    >
      <InputBase
        sx={{
          ml: 2,
          flex: 1,
          fontSize: { xs: "1.25rem", sm: "1.5rem" },
        }}
        placeholder="Search for a city..."
        inputProps={{ "aria-label": "search for a city" }}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <IconButton type="submit" sx={{ p: "15px" }} aria-label="search">
        <SearchIcon sx={{ fontSize: { xs: "2rem", sm: "2.5rem" } }} />{" "}
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
