import { useCallback, useEffect, useState } from "react";
import API from "../api/axios";

export function useItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    API.get("/api/items")
      .then((res) => {
        if (!active) return;
        setItems(res.data);
      })
      .catch(() => {
        if (!active) return;
        setError("Could not load items. Check API connection.");
      })
      .finally(() => {
        if (!active) return;
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const refreshItems = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await API.get("/api/items");
      setItems(res.data);
    } catch {
      setError("Could not refresh items.");
    } finally {
      setLoading(false);
    }
  }, []);

  const saveItem = useCallback(async (payload, editId = null) => {
    setSaving(true);
    setError("");
    try {
      if (editId) {
        await API.put(`/api/items/${editId}`, payload);
      } else {
        await API.post("/api/items", payload);
      }

      const res = await API.get("/api/items");
      setItems(res.data);
      return true;
    } catch {
      setError("Save failed. Please try again.");
      return false;
    } finally {
      setSaving(false);
    }
  }, []);

  const deleteItem = useCallback(async (id) => {
    setError("");
    try {
      await API.delete(`/api/items/${id}`);
      setItems((current) => current.filter((item) => item.id !== id));
      return true;
    } catch {
      setError("Delete failed. Please try again.");
      return false;
    }
  }, []);

  return {
    items,
    loading,
    saving,
    error,
    refreshItems,
    saveItem,
    deleteItem,
  };
}
