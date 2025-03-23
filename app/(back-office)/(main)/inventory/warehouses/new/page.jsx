"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import FixedHeader from "@/components/main/inventory/FixedHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUserMeta } from "@/lib/context/UserMetaContext";

export default function NewWarehouse() {
  const router = useRouter();
  const { addWarehouse } = useUserMeta();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // In a real app, this would be an API call
      const newWarehouse = {
        id: Date.now(), // Temporary ID generation
        ...formData,
        createdAt: new Date().toISOString(),
      };

      // Update the context
      addWarehouse(newWarehouse);

      // Redirect back to inventory page
      router.push("/inventory");
    } catch (error) {
      console.error("Error creating warehouse:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <FixedHeader onLayoutChange={() => {}} />
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-6">Create New Warehouse</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                Warehouse Name
              </label>
              <Input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full"
                placeholder="Enter warehouse name"
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-2">
                Description
              </label>
              <Input
                id="description"
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full"
                placeholder="Enter warehouse description"
              />
            </div>
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="px-4 py-2"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600"
              >
                {isSubmitting ? "Creating..." : "Create Warehouse"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
