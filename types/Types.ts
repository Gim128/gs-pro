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

export type DecodedAccessToken = {
    sub: string;
    iat: number;
    exp: number;
    authorities: string[];
    userId: number;
};
