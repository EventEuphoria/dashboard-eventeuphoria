"use client";

import { useState } from 'react';
import apiClient from '@/services/apiClient';

const useEvent = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const postEvent = async (formData: object) => {
        setLoading(true);
        try {
            const response = await apiClient.post('/events', formData);
            return response.data;
        } catch (err: any) {
            setError(err.message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    const updateEvent = async (id: number, formData: object) => {
        setLoading(true);
        try {
            const response = await apiClient.put(`/events/${id}`, formData);
            return response.data;
        } catch (err: any) {
            setError(err.message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    const getEvent = async (id: number) => {
        setLoading(true);
        try {
            const response = await apiClient.get(`/events/${id}`);
            return response.data;
        } catch (err: any) {
            setError(err.message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    const deleteEvent = async (id: string) => {
        setLoading(true);
        try {
            const response = await apiClient.delete(`/events/${id}`);
            return response.data;
        } catch (err: any) {
            setError(err.message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, postEvent, updateEvent, getEvent, deleteEvent };
};

export default useEvent;
