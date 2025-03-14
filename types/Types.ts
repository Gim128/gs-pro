export type Outlet ={
    outletId: number;
    districtId: number;
    districtName: string;
    name: string;
    address: string;
    contactNo: string;
    capacity: number;
    reservedCount: number;
    availableCount: number;
    createdAt: string;
    updatedAt: string;
    employees: number[];
}

export type UserOutlet = {
    id: number;
    name: string;
    address: string;
    contact_no: string;
    capacity: number;
    reserved_count: number;
    available_count: number;
    created_at: string;
    district: string;
}

export type DecodedAccessToken = {
    sub: string;
    iat: number;
    exp: number;
    authorities: string[];
    userId: number;
};
