import { Icon, type IconSymbol } from "@sanity/icons";

/**
 * The installed @sanity/icons build only exports a generic `Icon` +
 * lazy-loaded `icons` symbol map — its named per-icon exports (e.g.
 * `UserIcon`) are listed in the type declarations but don't exist in the
 * compiled JS, which breaks bundling. This wraps the generic component so
 * schema files can still assign a plain per-type icon.
 */
export function schemaIcon(symbol: IconSymbol) {
  return function SchemaIcon() {
    return <Icon symbol={symbol} />;
  };
}
