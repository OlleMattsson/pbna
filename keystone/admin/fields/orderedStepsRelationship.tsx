/** @jsxRuntime classic */
/** @jsx jsx */

import { useCallback, useMemo } from "react";

import { jsx } from "@keystone-ui/core";
import { gql, useQuery } from "@keystone-6/core/admin-ui/apollo";
import { useList } from "@keystone-6/core/admin-ui/context";

import {
  CardValue,
  Cell,
  Field as DefaultRelationshipField,
  controller,
} from "@keystone-6/core/fields/types/relationship/views";

type RelationshipFieldProps = Parameters<typeof DefaultRelationshipField>[0];

const DEFAULT_ORDER_FIELD = "order";
const FALLBACK_ORDER_VALUE = Number.MAX_SAFE_INTEGER;

const parseOrderValue = (raw: unknown): number => {
  if (raw === null || raw === undefined) return FALLBACK_ORDER_VALUE;
  if (typeof raw === "number")
    return Number.isFinite(raw) ? raw : FALLBACK_ORDER_VALUE;
  const numeric = Number(raw);
  return Number.isFinite(numeric) ? numeric : FALLBACK_ORDER_VALUE;
};

const buildOrderQuery = (listQueryName: string, orderField: string) => gql`
  query OrderedRelationshipItems($ids: [ID!]!) {
    items: ${listQueryName}(where: { id: { in: $ids } }) {
      id
      ${orderField}
    }
  }
`;

const OrderedRelationshipField = (props: RelationshipFieldProps) => {
  if (props.value.kind !== "cards-view") {
    return <DefaultRelationshipField {...props} />;
  }

  const foreignList = useList(props.field.refListKey);
  const orderField = foreignList.fields[DEFAULT_ORDER_FIELD]
    ? DEFAULT_ORDER_FIELD
    : null;

  // If the related list does not expose an `order` field we fall back to the
  // default relationship UI without any additional sorting.
  if (!orderField) {
    return <DefaultRelationshipField {...props} />;
  }

  const ids = useMemo(
    () => Array.from(props.value.currentIds),
    [props.value.currentIds]
  );
  const listQueryName = foreignList.gqlNames.listQueryName;

  const orderQuery = useMemo(
    () => buildOrderQuery(listQueryName, orderField),
    [listQueryName, orderField]
  );

  const { data } = useQuery(orderQuery, {
    variables: { ids },
    skip: ids.length === 0,
    fetchPolicy: "cache-first",
  });

  const orderById = useMemo(() => {
    const map = new Map<string, number>();
    if (Array.isArray(data?.items)) {
      data.items.forEach((item: any) => {
        if (item?.id) {
          map.set(item.id, parseOrderValue(item[orderField]));
        }
      });
    }
    return map;
  }, [data, orderField]);

  const sortIds = useCallback(
    (idsIterable: Iterable<string>) => {
      const original = Array.from(idsIterable);
      const originalIndex = new Map<string, number>();
      original.forEach((id, index) => originalIndex.set(id, index));

      return original.sort((a, b) => {
        const orderA = orderById.get(a) ?? FALLBACK_ORDER_VALUE;
        const orderB = orderById.get(b) ?? FALLBACK_ORDER_VALUE;
        if (orderA !== orderB) return orderA - orderB;
        return (originalIndex.get(a) ?? 0) - (originalIndex.get(b) ?? 0);
      });
    },
    [orderById]
  );

  const sortedCurrentIds = useMemo(
    () => new Set(sortIds(props.value.currentIds)),
    [props.value.currentIds, sortIds]
  );

  const sortedInitialIds = useMemo(() => {
    if (!props.value.initialIds) return props.value.initialIds;
    return new Set(sortIds(props.value.initialIds));
  }, [props.value.initialIds, sortIds]);

  const sortedValue = useMemo(
    () => ({
      ...props.value,
      currentIds: sortedCurrentIds,
      initialIds: sortedInitialIds,
    }),
    [props.value, sortedCurrentIds, sortedInitialIds]
  );

  const handleChange = useCallback(
    (nextValue: RelationshipFieldProps["value"]) => {
      if (!props.onChange) return;
      if (!nextValue || nextValue.kind !== "cards-view") {
        props.onChange(nextValue);
        return;
      }

      const nextSortedCurrent = new Set(sortIds(nextValue.currentIds));
      const nextSortedInitial = nextValue.initialIds
        ? new Set(sortIds(nextValue.initialIds))
        : nextValue.initialIds;

      props.onChange({
        ...nextValue,
        currentIds: nextSortedCurrent,
        initialIds: nextSortedInitial,
      });
    },
    [props.onChange, sortIds]
  );

  return (
    <DefaultRelationshipField
      {...props}
      value={sortedValue}
      onChange={props.onChange ? handleChange : props.onChange}
    />
  );
};

export { CardValue, Cell, controller };
export { OrderedRelationshipField as Field };
