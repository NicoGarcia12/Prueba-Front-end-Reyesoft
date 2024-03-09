import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import NavBar from "../../components/NavBar/NavBar";

export default function SystemDetail() {
  const dispatch = useDispatch();

  useEffect(() => {
  }, [dispatch]);

  return (
    <div>
      <NavBar />
      <h1>Systems</h1>
    </div>
  );
}
