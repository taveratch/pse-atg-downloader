export let USERNAME = 'root';
export let PASSWORD = 'pse@TGdownloader';
export let DB_NAME = process.env.NODE_ENV === 'production' ? 'pse_inventory_downloader' : 'pse_inventory_downloader_development' ;
export let HOST = 'sql.padungsilpa.group';
export let PORT = 3306;
