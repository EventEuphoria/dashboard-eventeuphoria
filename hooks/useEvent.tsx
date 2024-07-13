"use client";

import { useState } from 'react';
import apiClient from '@/services/apiClient';
import { parseCookies } from 'nookies';

const useEvent = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getAuthHeader = () => {
        const cookies = parseCookies();
        const token = cookies['sid'];
        return { Authorization: `Bearer ${token}` };
    };

    const postEvent = async (formData: object) => {
        setLoading(true);
        try {
            const response = await apiClient.post('/events', formData, {
                headers: {
                    ...getAuthHeader(),
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (err: any) {
            setError(err.message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    const uploadImage = async (eventId: number, image: File) => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('file', image);
            const response = await apiClient.post(`/events/${eventId}/image`, formData, {
                headers: {
                    ...getAuthHeader(),
                },
            });
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
            const response = await apiClient.put(`/events/${id}`, formData, {
                headers: {
                    ...getAuthHeader(),
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (err: any) {
            setError(err.message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    const getEvent = async (id: number) => {
        console.log()
        setLoading(true);
        try {
            const response = await apiClient.get(`/events/${id}`, {
                headers: getAuthHeader(),
            });
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
            const response = await apiClient.delete(`/events/${id}`, {
                headers: getAuthHeader(),
            });
            return response.data;
        } catch (err: any) {
            setError(err.message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, postEvent, updateEvent, getEvent, deleteEvent, uploadImage };
};

export default useEvent;
