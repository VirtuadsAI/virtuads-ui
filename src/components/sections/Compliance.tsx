import React from 'react';
import { Lock, Shield, CheckCircle } from 'lucide-react';

const Compliance = () => (
    <section className="py-24">
        <h2 className="text-4xl font-bold text-center mb-4">CUMPLIMIENTO Y PRIVACIDAD</h2>
        <p className="text-center text-brand-gray mb-16 max-w-2xl mx-auto">
            Plataforma diseñada para cumplir con regulaciones globales y estándares de seguridad
        </p>

        <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl bg-gradient-to-br from-brand-dark/80 to-brand-dark/40 border border-brand-green/30">
                <Lock className="w-12 h-12 text-brand-green mb-4" />
                <h3 className="text-xl font-bold mb-3">Regulación Global</h3>
                <ul className="text-brand-gray text-sm space-y-2">
                    <li>• MiCA (UE)</li>
                    <li>• GDPR</li>
                    <li>• FATF/AML</li>
                    <li>• SEC (Estados Unidos)</li>
                    <li>• SFC (Colombia)</li>
                </ul>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-brand-dark/80 to-brand-dark/40 border border-brand-green/30">
                <Shield className="w-12 h-12 text-brand-green mb-4" />
                <h3 className="text-xl font-bold mb-3">Mecanismos de Seguridad</h3>
                <ul className="text-brand-gray text-sm space-y-2">
                    <li>• KYC/AML programable</li>
                    <li>• Geofencing dinámico</li>
                    <li>• zk-proofs (privacidad)</li>
                    <li>• HSM/KMS para keys</li>
                </ul>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-brand-dark/80 to-brand-dark/40 border border-brand-green/30">
                <CheckCircle className="w-12 h-12 text-brand-green mb-4" />
                <h3 className="text-xl font-bold mb-3">Certificaciones</h3>
                <ul className="text-brand-gray text-sm space-y-2">
                    <li>• ISO/IEC 27001 (target 2027)</li>
                    <li>• OWASP Top 10</li>
                    <li>• SOC 2 Type II</li>
                    <li>• DAO Governance (2026)</li>
                </ul>
            </div>
        </div>
    </section>
);

export default Compliance;
