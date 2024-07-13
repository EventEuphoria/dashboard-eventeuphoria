"use client";

import { useState } from 'react';
import axios from 'axios';

const useEvent = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const postEvent = async (formData: object) => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8080/events', formData, {
                headers: {
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

    const updateEvent = async (id: string, formData: object) => {
        setLoading(true);
        try {
            const response = await axios.put(`http://localhost:8080/events/${id}`, formData, {
                headers: {
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

    const getEvent = async (id: string) => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8080/events/${id}`);
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
            const response = await axios.delete(`http://localhost:8080/events/${id}`);
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
