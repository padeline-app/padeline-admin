"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDateTime } from "@/lib/format";
import { RoleBadge } from "@/components/role-badge";
import { useAdminAuth } from "@/lib/firebase/admin-auth";
import type { AdminRole } from "@/lib/types";
import type { ListAdminsResult } from "@/server/admins/api";
import {
  assignRole,
  revokeAccess,
  type AdminsActionState,
} from "@/server/admins/actions";

const INITIAL_STATE: AdminsActionState = { error: null };
const ROLE_OPTIONS: AdminRole[] = ["OWNER", "ADMIN", "VIEWER"];

export function AdminsScreen({ admins }: { admins: ListAdminsResult }) {
  const { user } = useAdminAuth();
  const [assignState, assignFormAction] = useActionState(
    assignRole,
    INITIAL_STATE,
  );
  const [revokeState, revokeFormAction] = useActionState(
    revokeAccess,
    INITIAL_STATE,
  );
  const actionError = assignState.error ?? revokeState.error;

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold">Admins</h1>
        <p className="text-sm text-muted-foreground">
          {admins.length} admin{admins.length === 1 ? "" : "s"} with access
        </p>
      </div>
      {actionError ? (
        <p className="text-sm text-destructive">{actionError}</p>
      ) : null}
      <Card>
        <CardContent>
          {admins.length === 0 ? (
            <p className="py-12 text-center text-sm text-muted-foreground">
              No admins yet.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Last sign-in</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {admins.map((admin) => {
                  const isSelf = admin.firebaseUid === user?.uid;
                  return (
                    <TableRow key={admin.firebaseUid}>
                      <TableCell className="font-medium">
                        {admin.email}
                        {isSelf ? (
                          <span className="ml-1.5 text-xs text-muted-foreground">
                            (you)
                          </span>
                        ) : null}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <RoleBadge role={admin.role} />
                          {!isSelf ? (
                            <form action={assignFormAction}>
                              <input
                                type="hidden"
                                name="firebaseUid"
                                value={admin.firebaseUid}
                              />
                              <select
                                name="role"
                                defaultValue={admin.role}
                                aria-label={`Role for ${admin.email}`}
                                onChange={(e) =>
                                  e.currentTarget.form?.requestSubmit()
                                }
                                className="h-8 rounded-md border border-input bg-background px-2 text-sm"
                              >
                                {ROLE_OPTIONS.map((role) => (
                                  <option key={role} value={role}>
                                    {role}
                                  </option>
                                ))}
                              </select>
                            </form>
                          ) : null}
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {admin.lastLoginAt
                          ? formatDateTime({ value: admin.lastLoginAt })
                          : "—"}
                      </TableCell>
                      <TableCell className="text-right">
                        {!isSelf ? (
                          <form action={revokeFormAction}>
                            <input
                              type="hidden"
                              name="firebaseUid"
                              value={admin.firebaseUid}
                            />
                            <Button variant="outline" size="sm" type="submit">
                              Revoke
                            </Button>
                          </form>
                        ) : null}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
