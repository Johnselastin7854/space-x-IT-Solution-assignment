"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { AlignLeft, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { z } from "zod";
import { Button } from "./ui/button";

interface Category {
  id: string;
  category: string;
}
const Products = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const getCategory = async () => {
      try {
        setLoader(true);
        const response = await axios.get(
          `/api/user/get-categories?page=${page}&limit=6`,
        );
        setCategories(response.data.categories);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoader(false);
      }
    };
    getCategory();
  }, [page]);

  useEffect(() => {
    const getSelectedCategories = async () => {
      try {
        const response = await axios.get(
          `/api/user/get-user-selected-category`,
        );
        setSelectedCategories(response.data.data || []);
      } catch (error) {
        console.error("Error fetching selected categories:", error);
      }
    };
    getSelectedCategories();
  }, []);

  const handleCheckboxChange = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId],
    );
  };

  const handleSaveCategories = async () => {
    try {
      const response = await axios
        .post("/api/user/user-selected-category", {
          selectedCategories,
        })
        .then((response) => console.log("Categories saved:", response.data));
    } catch (error) {
      console.error("Error saving categories:", error);
    }
  };

  if (loader) {
    return (
      <div className="text-center">
        Loading... <Loader2 className="animate-spin" />
      </div>
    );
  }

  console.log(selectedCategories, "hello");
  return (
    <div className="rounded-md border border-gray-300 p-10">
      <h1 className="text-center text-lg font-semibold">
        Please mark your interests!
      </h1>
      <p className="m-3 text-center text-xs font-normal">
        We will keep you notified.
      </p>

      <div>
        <p className="text-sm font-semibold">My saved interests!</p>

        <div>
          {categories.map((category: any) => (
            <div className="mb-2 mt-2 flex gap-2 space-x-2">
              <Checkbox
                id={`${category.id}`}
                checked={selectedCategories.includes(category?.id)}
                onCheckedChange={() => handleCheckboxChange(category.id)}
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor={`${category.id}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {category?.category}
                </label>
              </div>
            </div>
          ))}
        </div>

        <div className="my-4 flex items-center justify-center gap-4">
          <Button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            <ChevronLeft />
          </Button>
          <span className="text-center text-sm">
            {" "}
            Page {page} of {totalPages}{" "}
          </span>
          <Button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
          >
            <ChevronRight />
          </Button>
        </div>

        <Button
          disabled={selectedCategories.length === 0 ? true : false}
          className="m-auto mt-4 flex items-center justify-center"
          onClick={handleSaveCategories}
        >
          Save Categories
        </Button>
      </div>
    </div>
  );
};

export default Products;
