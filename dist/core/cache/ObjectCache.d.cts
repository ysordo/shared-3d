declare class ObjectCache {
    private static getKey;
    static setMetadata(id: string, hash: string, updatedAt?: number): Promise<void>;
    static getMetadata(id: string): Promise<{
        hash: string;
        updatedAt: number;
    } | null>;
    static has(id: string): Promise<boolean>;
    static delete(id: string): Promise<void>;
    static clearAll(): Promise<void>;
}

export { ObjectCache };
