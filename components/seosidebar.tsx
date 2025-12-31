"use client";

import { FC, useState } from "react";
import { FiTrendingUp } from "react-icons/fi";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface SeoSidebarProps {
  title: string;
  description: string;
  slug: string;
  onFieldChange: (field: string, value: string) => void;
  selectedCategories: string[];
  onCategoryChange: (categoryId: string) => void;
}

const SeoSidebar: FC<SeoSidebarProps> = ({
  title,
  description,
  slug,
  onFieldChange,
  selectedCategories = [],
  onCategoryChange,
}) => {
  const [categories, setCategories] = useState([
    { id: "tech", name: "Technology" },
    { id: "life", name: "Lifestyle" },
    { id: "food", name: "Food" },
  ]);
  const [newCategory, setNewCategory] = useState("");

  const addNewCategory = () => {
    const trimmed = newCategory.trim();
    if (!trimmed) return;
    const id = trimmed.toLowerCase().replace(/\s+/g, "-");
    if (categories.find(cat => cat.id === id)) return alert("Category already exists!");
    const newCat = { id, name: trimmed };
    setCategories(prev => [...prev, newCat]);
    onCategoryChange(id);
    setNewCategory("");
  };

  const seoScore = Math.min(
    (title.length > 10 ? 30 : 0) +
      (description.length > 50 ? 50 : 0) +
      (slug ? 20 : 0),
    100
  );

  return (
    <Card className="lg:w-60 w-full h-full border-none">
      <CardHeader>
        <CardTitle >SEO Optimization</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 ">
        {/* Meta Title */}
        <div >
          <label className="text-sm font-medium mb-1 block">Meta Title</label>
          <Input
            value={title}
            onChange={(e) => onFieldChange("title", e.target.value)}
            placeholder="SEO title"
          />
        </div>

        {/* Meta Description */}
        <div>
          <label className="text-sm font-medium mb-1 block">Meta Description</label>
          <Textarea
            value={description}
            onChange={(e) => onFieldChange("description", e.target.value)}
            placeholder="SEO description"
            className="h-24"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="text-sm font-medium mb-1 block">Slug (URL)</label>
          <Input
            value={slug}
            onChange={(e) => onFieldChange("slug", e.target.value)}
            placeholder="my-blog-post"
          />
          <p className="text-xs text-gray-500 mt-1">
            URL Preview: https://yourdomain.com/blog/{slug || "your-slug"}
          </p>
        </div>

        {/* Categories Dropdown */}
        <div className="mt-4">
          <label className="text-medium text-gray-500 font-medium mb-2 block ml-1 ">Categories</label>
          <DropdownMenu >
            <DropdownMenuTrigger asChild>
              <Button className="w-full">Select Categories</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 p-2 space-y-2">
              {/* Add new category */}
              <div className="flex gap-2">
                <Input
                  placeholder="Add new category"
                  value={newCategory}
                  onChange={e => setNewCategory(e.target.value)}
                  className="flex-1"
                />
                <Button size="sm" onClick={addNewCategory}>Add</Button>
              </div>

              {/* Category checkboxes */}
              {categories.map(cat => (
                <DropdownMenuItem key={cat.id} asChild>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <Checkbox
                      checked={selectedCategories.includes(cat.id)}
                      onChange={() => onCategoryChange(cat.id)}
                    />
                    <span>{cat.name}</span>
                  </label>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Selected Categories Display */}
          {selectedCategories.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {selectedCategories.map(catId => {
                const cat = categories.find(c => c.id === catId);
                return (
                  <div
                    key={catId}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-2"
                  >
                    <span>{cat?.name || catId}</span>
                    <button
                      type="button"
                      onClick={() => onCategoryChange(catId)}
                      className="text-blue-600 hover:text-red-600"
                    >
                      ×
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* SEO Score */}
        <div className="space-y-1 mt-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">SEO Score</span>
            <div className="flex items-center gap-1 text-green-600">
              <FiTrendingUp /> <span>{seoScore}%</span>
            </div>
          </div>
          <Progress value={seoScore} className="h-2 rounded" />
        </div>
      </CardContent>
      <CardFooter />
    </Card>
  );
};

export default SeoSidebar;
