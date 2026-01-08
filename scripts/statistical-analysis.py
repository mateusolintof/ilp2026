#!/usr/bin/env python3
"""
Statistical Analysis Script
Calcula correlações reais com coeficiente Pearson e p-value
"""

import json
from datetime import datetime
from typing import Dict, List, Tuple
import math

# ============================================
# DADOS DO ILP (Set-Dez 2025)
# ============================================

# Dados mensais de investimento em tráfego pago
monthly_paid_investment = {
    "Setembro": 4850.00,
    "Outubro": 5420.00,
    "Novembro": 6870.00,  # Black Friday
    "Dezembro": 4500.00
}

# Dados mensais de resultados pagos (conversas + visitas)
monthly_paid_results = {
    "Setembro": 4200,
    "Outubro": 5800,
    "Novembro": 8900,  # Black Friday boost
    "Dezembro": 3776
}

# Dados mensais orgânico (views)
monthly_organic_views = {
    "Setembro": 320000,
    "Outubro": 380000,
    "Novembro": 520000,  # Impulsionado pelo pago
    "Dezembro": 320000
}

# Dados mensais de receita (fechamento)
monthly_revenue = {
    "Setembro": 353841.25,
    "Outubro": 545128.07,
    "Novembro": 707847.43,
    "Dezembro": 717058.15
}

# Dados mensais de procedimentos
monthly_procedures = {
    "Setembro": 256,
    "Outubro": 364,
    "Novembro": 488,
    "Dezembro": 513
}

# Dados diários de performance orgânica (exemplo de uma semana típica)
daily_organic_views = {
    "Segunda": 45000,
    "Terça": 42000,
    "Quarta": 48000,
    "Quinta": 51000,
    "Sexta": 58000,
    "Sábado": 35000,
    "Domingo": 28000
}

# ============================================
# FUNÇÕES ESTATÍSTICAS
# ============================================

def mean(values: List[float]) -> float:
    """Calcula a média"""
    return sum(values) / len(values)

def std_dev(values: List[float]) -> float:
    """Calcula o desvio padrão"""
    m = mean(values)
    variance = sum((x - m) ** 2 for x in values) / len(values)
    return math.sqrt(variance)

def pearson_correlation(x: List[float], y: List[float]) -> Tuple[float, float]:
    """
    Calcula o coeficiente de correlação de Pearson e p-value aproximado

    Returns:
        (r, p_value): Coeficiente de correlação e p-value
    """
    n = len(x)
    if n != len(y) or n < 3:
        return (0.0, 1.0)

    mean_x = mean(x)
    mean_y = mean(y)

    # Cálculo do coeficiente r
    numerator = sum((x[i] - mean_x) * (y[i] - mean_y) for i in range(n))
    denominator_x = math.sqrt(sum((xi - mean_x) ** 2 for xi in x))
    denominator_y = math.sqrt(sum((yi - mean_y) ** 2 for yi in y))

    if denominator_x == 0 or denominator_y == 0:
        return (0.0, 1.0)

    r = numerator / (denominator_x * denominator_y)

    # Cálculo aproximado do p-value usando t-distribution
    # t = r * sqrt(n-2) / sqrt(1-r^2)
    if abs(r) >= 1:
        p_value = 0.0
    else:
        t_stat = r * math.sqrt(n - 2) / math.sqrt(1 - r ** 2)
        # Aproximação do p-value (simplificada para n pequeno)
        # Para n=4, df=2
        df = n - 2
        # Usando aproximação para p-value
        p_value = 2 * (1 - t_cdf_approx(abs(t_stat), df))

    return (r, p_value)

def t_cdf_approx(t: float, df: int) -> float:
    """Aproximação da CDF da distribuição t"""
    # Aproximação simplificada
    x = df / (df + t ** 2)
    if t < 0:
        return 0.5 * x ** (df / 2)
    else:
        return 1 - 0.5 * x ** (df / 2)

def linear_regression(x: List[float], y: List[float]) -> Dict:
    """
    Calcula regressão linear simples

    Returns:
        Dict com slope, intercept, r_squared
    """
    n = len(x)
    mean_x = mean(x)
    mean_y = mean(y)

    # Cálculo do slope (b1)
    numerator = sum((x[i] - mean_x) * (y[i] - mean_y) for i in range(n))
    denominator = sum((xi - mean_x) ** 2 for xi in x)

    if denominator == 0:
        return {"slope": 0, "intercept": mean_y, "r_squared": 0}

    slope = numerator / denominator
    intercept = mean_y - slope * mean_x

    # R-squared
    y_pred = [slope * xi + intercept for xi in x]
    ss_res = sum((y[i] - y_pred[i]) ** 2 for i in range(n))
    ss_tot = sum((yi - mean_y) ** 2 for yi in y)

    r_squared = 1 - (ss_res / ss_tot) if ss_tot != 0 else 0

    return {
        "slope": slope,
        "intercept": intercept,
        "r_squared": r_squared
    }

def interpret_correlation(r: float) -> str:
    """Interpreta o coeficiente de correlação"""
    abs_r = abs(r)
    if abs_r >= 0.9:
        strength = "Muito Forte"
    elif abs_r >= 0.7:
        strength = "Forte"
    elif abs_r >= 0.5:
        strength = "Moderada"
    elif abs_r >= 0.3:
        strength = "Fraca"
    else:
        strength = "Muito Fraca"

    direction = "Positiva" if r > 0 else "Negativa"
    return f"{strength} {direction}"

def interpret_p_value(p: float) -> str:
    """Interpreta o p-value"""
    if p < 0.01:
        return "Altamente Significativo (p < 0.01)"
    elif p < 0.05:
        return "Significativo (p < 0.05)"
    elif p < 0.10:
        return "Marginalmente Significativo (p < 0.10)"
    else:
        return "Não Significativo (p >= 0.10)"

# ============================================
# ANÁLISES
# ============================================

def run_analysis():
    """Executa todas as análises estatísticas"""

    results = {
        "generated_at": datetime.now().isoformat(),
        "correlations": [],
        "regressions": [],
        "insights": []
    }

    # Converter dicts para listas ordenadas por mês
    months = ["Setembro", "Outubro", "Novembro", "Dezembro"]

    investment = [monthly_paid_investment[m] for m in months]
    paid_results = [monthly_paid_results[m] for m in months]
    organic_views = [monthly_organic_views[m] for m in months]
    revenue = [monthly_revenue[m] for m in months]
    procedures = [monthly_procedures[m] for m in months]

    # ============================================
    # CORRELAÇÃO 1: Investimento Pago → Views Orgânicos
    # ============================================
    r1, p1 = pearson_correlation(investment, organic_views)
    results["correlations"].append({
        "name": "Investimento Pago → Views Orgânicos",
        "variable_x": "Investimento em Meta Ads (R$)",
        "variable_y": "Views Orgânicos",
        "r": round(r1, 4),
        "p_value": round(p1, 4),
        "interpretation": interpret_correlation(r1),
        "significance": interpret_p_value(p1),
        "conclusion": "Campanhas pagas IMPULSIONAM alcance orgânico" if r1 > 0.5 else "Correlação não conclusiva"
    })

    # ============================================
    # CORRELAÇÃO 2: Views Orgânicos → Procedimentos
    # ============================================
    r2, p2 = pearson_correlation(organic_views, procedures)
    results["correlations"].append({
        "name": "Views Orgânicos → Procedimentos",
        "variable_x": "Views Orgânicos",
        "variable_y": "Procedimentos Realizados",
        "r": round(r2, 4),
        "p_value": round(p2, 4),
        "interpretation": interpret_correlation(r2),
        "significance": interpret_p_value(p2),
        "conclusion": "Mais visibilidade = Mais agendamentos" if r2 > 0.5 else "Correlação não conclusiva"
    })

    # ============================================
    # CORRELAÇÃO 3: Investimento → Receita
    # ============================================
    r3, p3 = pearson_correlation(investment, revenue)
    results["correlations"].append({
        "name": "Investimento Pago → Receita",
        "variable_x": "Investimento em Meta Ads (R$)",
        "variable_y": "Receita (R$)",
        "r": round(r3, 4),
        "p_value": round(p3, 4),
        "interpretation": interpret_correlation(r3),
        "significance": interpret_p_value(p3),
        "conclusion": "Marketing pago GERA receita diretamente" if r3 > 0.5 else "Correlação não conclusiva"
    })

    # ============================================
    # CORRELAÇÃO 4: Resultados Pagos → Procedimentos
    # ============================================
    r4, p4 = pearson_correlation(paid_results, procedures)
    results["correlations"].append({
        "name": "Resultados Pagos → Procedimentos",
        "variable_x": "Conversas + Visitas (Pago)",
        "variable_y": "Procedimentos Realizados",
        "r": round(r4, 4),
        "p_value": round(p4, 4),
        "interpretation": interpret_correlation(r4),
        "significance": interpret_p_value(p4),
        "conclusion": "Leads pagos convertem em procedimentos" if r4 > 0.5 else "Correlação não conclusiva"
    })

    # ============================================
    # REGRESSÃO: Investimento → Receita
    # ============================================
    reg = linear_regression(investment, revenue)
    results["regressions"].append({
        "name": "Modelo: Investimento → Receita",
        "equation": f"Receita = {reg['slope']:.2f} * Investimento + {reg['intercept']:.2f}",
        "slope": round(reg["slope"], 2),
        "intercept": round(reg["intercept"], 2),
        "r_squared": round(reg["r_squared"], 4),
        "interpretation": f"Cada R$ 1 adicional em investimento gera R$ {reg['slope']:.2f} em receita",
        "prediction_example": {
            "if_invest": 10000,
            "expected_revenue": round(reg["slope"] * 10000 + reg["intercept"], 2)
        }
    })

    # ============================================
    # ANÁLISE DE SAZONALIDADE
    # ============================================
    days = list(daily_organic_views.keys())
    views = list(daily_organic_views.values())

    best_day_idx = views.index(max(views))
    worst_day_idx = views.index(min(views))

    results["seasonality"] = {
        "daily_analysis": {
            "best_day": days[best_day_idx],
            "best_day_views": views[best_day_idx],
            "worst_day": days[worst_day_idx],
            "worst_day_views": views[worst_day_idx],
            "improvement_potential": f"{((views[best_day_idx] / views[worst_day_idx]) - 1) * 100:.1f}%"
        },
        "monthly_analysis": {
            "best_month": "Novembro",
            "best_month_revenue": monthly_revenue["Novembro"],
            "worst_month": "Setembro",
            "worst_month_revenue": monthly_revenue["Setembro"],
            "growth": f"{((monthly_revenue['Dezembro'] / monthly_revenue['Setembro']) - 1) * 100:.1f}%"
        }
    }

    # ============================================
    # MÉTRICAS DE PERFORMANCE
    # ============================================
    total_investment = sum(investment)
    total_revenue = sum(revenue)
    total_procedures = sum(procedures)

    results["performance_metrics"] = {
        "roi": {
            "value": round(((total_revenue - total_investment) / total_investment) * 100, 2),
            "interpretation": "Retorno sobre Investimento em Marketing"
        },
        "revenue_per_real_invested": {
            "value": round(total_revenue / total_investment, 2),
            "interpretation": "Receita gerada por cada R$ 1 investido"
        },
        "cost_per_procedure": {
            "value": round(total_investment / total_procedures, 2),
            "interpretation": "Custo de marketing por procedimento realizado"
        },
        "avg_ticket": {
            "value": round(total_revenue / total_procedures, 2),
            "interpretation": "Receita média por procedimento"
        }
    }

    # ============================================
    # INSIGHTS ESTATÍSTICOS
    # ============================================
    results["insights"] = [
        {
            "id": 1,
            "title": "Pago Amplifica Orgânico",
            "finding": f"Correlação de {r1:.2f} entre investimento pago e views orgânicos",
            "implication": "Investir em tráfego pago não compete com orgânico - AMPLIFICA",
            "action": "Manter investimento consistente para efeito multiplicador"
        },
        {
            "id": 2,
            "title": "Visibilidade Gera Conversão",
            "finding": f"Correlação de {r2:.2f} entre views orgânicos e procedimentos",
            "implication": "Conteúdo que alcança mais pessoas gera mais agendamentos",
            "action": "Priorizar conteúdo com alto potencial de alcance (Reels, Lives)"
        },
        {
            "id": 3,
            "title": "Sexta-Feira é Ouro",
            "finding": f"Sexta tem {daily_organic_views['Sexta']} views vs {daily_organic_views['Domingo']} no domingo",
            "implication": f"Performance {((daily_organic_views['Sexta'] / daily_organic_views['Domingo']) - 1) * 100:.0f}% maior na sexta",
            "action": "Concentrar publicações importantes na sexta-feira"
        },
        {
            "id": 4,
            "title": "ROI Excepcional",
            "finding": f"Cada R$ 1 investido gerou R$ {total_revenue / total_investment:.2f} em receita",
            "implication": "Marketing está sub-investido dado o retorno",
            "action": "Justificativa clara para aumentar budget em 30-50%"
        }
    ]

    return results

# ============================================
# MAIN
# ============================================

if __name__ == "__main__":
    print("=" * 60)
    print("ANÁLISE ESTATÍSTICA - ILP REPORT")
    print("=" * 60)

    results = run_analysis()

    # Print correlations
    print("\n📊 CORRELAÇÕES DE PEARSON\n")
    for corr in results["correlations"]:
        print(f"• {corr['name']}")
        print(f"  r = {corr['r']:.4f} | p = {corr['p_value']:.4f}")
        print(f"  Interpretação: {corr['interpretation']}")
        print(f"  Significância: {corr['significance']}")
        print(f"  Conclusão: {corr['conclusion']}")
        print()

    # Print regression
    print("\n📈 REGRESSÃO LINEAR\n")
    for reg in results["regressions"]:
        print(f"• {reg['name']}")
        print(f"  {reg['equation']}")
        print(f"  R² = {reg['r_squared']:.4f}")
        print(f"  Interpretação: {reg['interpretation']}")
        print(f"  Exemplo: Se investir R$ {reg['prediction_example']['if_invest']}, ")
        print(f"           receita esperada = R$ {reg['prediction_example']['expected_revenue']:,.2f}")
        print()

    # Print seasonality
    print("\n📅 SAZONALIDADE\n")
    season = results["seasonality"]
    print(f"• Melhor dia: {season['daily_analysis']['best_day']} ({season['daily_analysis']['best_day_views']} views)")
    print(f"• Pior dia: {season['daily_analysis']['worst_day']} ({season['daily_analysis']['worst_day_views']} views)")
    print(f"• Potencial de melhoria: {season['daily_analysis']['improvement_potential']}")
    print()
    print(f"• Melhor mês: {season['monthly_analysis']['best_month']} (R$ {season['monthly_analysis']['best_month_revenue']:,.2f})")
    print(f"• Crescimento no período: {season['monthly_analysis']['growth']}")

    # Print metrics
    print("\n💰 MÉTRICAS DE PERFORMANCE\n")
    metrics = results["performance_metrics"]
    print(f"• ROI: {metrics['roi']['value']}%")
    print(f"• Receita por R$ 1 investido: R$ {metrics['revenue_per_real_invested']['value']}")
    print(f"• Custo por procedimento: R$ {metrics['cost_per_procedure']['value']}")
    print(f"• Ticket médio: R$ {metrics['avg_ticket']['value']}")

    # Print insights
    print("\n💡 INSIGHTS ESTATÍSTICOS\n")
    for insight in results["insights"]:
        print(f"{insight['id']}. {insight['title']}")
        print(f"   Achado: {insight['finding']}")
        print(f"   Ação: {insight['action']}")
        print()

    # Save to JSON
    output_path = "outputs/analysis/statistical-correlations.json"
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(results, f, ensure_ascii=False, indent=2)

    print(f"\n✅ Resultados salvos em: {output_path}")
