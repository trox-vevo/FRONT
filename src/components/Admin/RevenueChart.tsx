import React, { useState, useEffect } from 'react';
import styles from './RevenueChart.module.css';
import { apiRequest } from '../../config/api';

const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

export const RevenueChart = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [stats, setStats] = useState<any>(null);
  const [prevStats, setPrevStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStats(selectedYear);
    fetchStats(selectedYear - 1, true);
    // eslint-disable-next-line
  }, [selectedYear]);

  const fetchStats = async (year: number, isPrev = false) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiRequest(`/api/analytics/summary?year=${year}`);
      if (response.success) {
        if (isPrev) setPrevStats(response.data);
        else setStats(response.data);
      } else {
        setError('No se pudieron obtener los datos');
      }
    } catch (err) {
      setError('Error al obtener los datos');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !stats) return <div className={styles.container}><p>Cargando...</p></div>;
  if (error) return <div className={styles.container}><p style={{color:'red'}}>{error}</p></div>;
  if (!stats) return null;

  // Cálculos de tendencias
  const revenueTrend = prevStats && prevStats.ingresosTotales ? (((stats.ingresosTotales - prevStats.ingresosTotales) / prevStats.ingresosTotales) * 100).toFixed(1) : '0';
  const salesTrend = prevStats && prevStats.ventasTotales ? (((stats.ventasTotales - prevStats.ventasTotales) / prevStats.ventasTotales) * 100).toFixed(1) : '0';
  const avgOrderTrend = prevStats && prevStats.valorPromedioOrden ? (((stats.valorPromedioOrden - prevStats.valorPromedioOrden) / prevStats.valorPromedioOrden) * 100).toFixed(1) : '0';

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Resumen de Ingresos</h2>
        <div className={styles.filters}>
          <select
            className={styles.select}
            value={selectedYear}
            onChange={e => setSelectedYear(Number(e.target.value))}
          >
            {[currentYear, currentYear-1, currentYear-2].map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.stats}>
        <div className={styles.statCard}>
          <h3>Ingresos Totales</h3>
          <p className={styles.value}>${stats.ingresosTotales.toLocaleString()}</p>
          <span className={`${styles.trend} ${Number(revenueTrend) >= 0 ? styles.positive : styles.negative}`}>
            {Number(revenueTrend) >= 0 ? '+' : ''}
            {revenueTrend}% respecto al año pasado
          </span>
        </div>
        <div className={styles.statCard}>
          <h3>Ventas Totales</h3>
          <p className={styles.value}>{stats.ventasTotales.toLocaleString()}</p>
          <span className={`${styles.trend} ${Number(salesTrend) >= 0 ? styles.positive : styles.negative}`}>
            {Number(salesTrend) >= 0 ? '+' : ''}
            {salesTrend}% respecto al año pasado
          </span>
        </div>
        <div className={styles.statCard}>
          <h3>Valor Promedio de Orden</h3>
          <p className={styles.value}>${stats.valorPromedioOrden.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
          <span className={`${styles.trend} ${Number(avgOrderTrend) >= 0 ? styles.positive : styles.negative}`}>
            {Number(avgOrderTrend) >= 0 ? '+' : ''}
            {avgOrderTrend}% respecto al año pasado
          </span>
        </div>
      </div>

      <div className={styles.chartContainer}>
        <div className={styles.chartHeader}>
          <h3>Ingresos Mensuales</h3>
          <div className={styles.legend}>
            <span className={styles.legendItem}>
              <span className={`${styles.legendColor} ${styles.revenue}`}></span>
              Ingresos
            </span>
            <span className={styles.legendItem}>
              <span className={`${styles.legendColor} ${styles.sales}`}></span>
              Ventas
            </span>
          </div>
        </div>
        <div className={styles.barChart}>
          {stats.monthlyData.map((item: any, idx: number) => (
            <div key={months[idx]} className={styles.barGroup}>
              <div className={styles.bars}>
                <div 
                  className={`${styles.bar} ${styles.revenueBar}`}
                  style={{ height: `${stats.ingresosTotales ? (item.ingresos / Math.max(...stats.monthlyData.map((m:any)=>m.ingresos),1)) * 100 : 0}%` }}
                  title={`Ingresos: $${item.ingresos.toLocaleString()}`}
                />
                <div 
                  className={`${styles.bar} ${styles.salesBar}`}
                  style={{ height: `${stats.ventasTotales ? (item.ventas / Math.max(...stats.monthlyData.map((m:any)=>m.ventas),1)) * 100 : 0}%` }}
                  title={`Ventas: ${item.ventas.toLocaleString()}`}
                />
              </div>
              <span className={styles.barLabel}>{months[idx]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};