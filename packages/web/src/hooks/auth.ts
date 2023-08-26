import { ISessionUser } from "chore-scheduler-common";
import { useState } from "react";


function useProviceAuth() {
    const [user, setUser] = useState<ISessionUser | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
}