"use client";

import { useEffect, useMemo, useRef } from "react";
import { getAllEmployees } from "@/modules/employee/model/employee-thunks";
import { useAppDispatch } from "@/shared/lib/redux/hooks/use-app-dispatch";
import { useAppSelector } from "@/shared/lib/redux/hooks/use-app-selector";
import { InformationToast } from "@/shared/ui/information-toast/InformationToast";
import { iconNames } from "@/shared/ui/icon/icon-name";
import { getTodayDate } from "@/shared/utils/date";
import {
    getBirthdayDescription,
    isBirthdayOnDate,
} from "@/modules/employee/components/birthday-toast-notifier/birthdayToastNotifier.funcs";
import { WithCoffeeShopId } from "@/shared/types/with-coffee-shop-id";

export function BirthdayToastNotifier({ coffeeShopId }: WithCoffeeShopId) {
    const dispatch = useAppDispatch();
    const employees = useAppSelector((state) => state.employee.data);
    const isLoadingEmployees = useAppSelector((state) => state.employee.loading);
    const shownToastIds = useRef<Set<string>>(new Set());
    const hasRequestedEmployees = useRef(false);
    const today = useMemo(() => new Date(), []);
    const tomorrow = useMemo(() => {
        const date = new Date(today);

        date.setDate(today.getDate() + 1);

        return date;
    }, [today]);
    const todayKey = useMemo(() => getTodayDate(), []);

    useEffect(() => {
        if (hasRequestedEmployees.current || employees.length || isLoadingEmployees) return;

        hasRequestedEmployees.current = true;
        dispatch(getAllEmployees(coffeeShopId));
    }, [dispatch, employees.length, isLoadingEmployees]);

    useEffect(() => {
        const birthdayEmployees = employees.filter((employee) => isBirthdayOnDate(employee, today));
        const tomorrowBirthdayEmployees = employees.filter((employee) =>
            isBirthdayOnDate(employee, tomorrow),
        );

        birthdayEmployees.forEach((employee) => {
            const toastId = `employee-birthday-${employee._id}-${todayKey}`;

            if (shownToastIds.current.has(toastId)) return;

            shownToastIds.current.add(toastId);

            InformationToast({
                id: toastId,
                duration: 10000,
                iconName: iconNames.cake,
                title: "День народження",
                description: getBirthdayDescription(employee, today),
            });
        });

        tomorrowBirthdayEmployees.forEach((employee) => {
            const toastId = `employee-birthday-tomorrow-${employee._id}-${todayKey}`;

            if (shownToastIds.current.has(toastId)) return;

            shownToastIds.current.add(toastId);

            InformationToast({
                id: toastId,
                duration: 10000,
                iconName: iconNames.cake,
                title: "Завтра день народження",
                description: getBirthdayDescription(employee, tomorrow),
            });
        });
    }, [employees, today, todayKey, tomorrow]);

    return null;
}
