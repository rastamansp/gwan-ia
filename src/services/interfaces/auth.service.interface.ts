import { User, UserSession, UpdateProfileData } from '../../types/auth.types';

/**
 * Interface que define o contrato para o serviço de autenticação.
 *
 * Esta interface estabelece os métodos obrigatórios que devem ser implementados
 * por qualquer classe que forneça funcionalidades de autenticação no sistema.
 *
 * @interface IAuthService
 */
export interface IAuthService {
  /**
   * Registra um novo usuário no sistema.
   *
   * @param userData - Dados do usuário para registro
   * @param userData.name - Nome completo do usuário
   * @param userData.email - Email único do usuário
   * @param userData.whatsapp - Número do WhatsApp do usuário
   * @returns Promise que resolve quando o registro é concluído
   * @throws {AuthError} Quando há erro no processo de registro
   */
  register(userData: {
    name: string;
    email: string;
    whatsapp: string;
  }): Promise<void>;

  /**
   * Inicia o processo de login enviando código de verificação por email.
   *
   * @param email - Email do usuário para login
   * @returns Promise que resolve quando o código é enviado
   * @throws {AuthError} Quando há erro no envio do código
   */
  login(email: string): Promise<void>;

  /**
   * Verifica o código de login e autentica o usuário.
   *
   * @param email - Email do usuário
   * @param code - Código de verificação recebido por email
   * @returns Promise que resolve com a sessão do usuário autenticado
   * @throws {AuthError} Quando o código é inválido ou há erro na verificação
   */
  verifyLogin(email: string, code: string): Promise<UserSession>;

  /**
   * Encerra a sessão atual do usuário e limpa os dados de autenticação.
   *
   * @returns Promise que resolve quando o logout é concluído
   * @throws {AuthError} Quando há erro no processo de logout
   */
  logout(): Promise<void>;

  /**
   * Obtém o perfil completo do usuário autenticado.
   *
   * @returns Promise que resolve com os dados do usuário
   * @throws {AuthError} Quando o usuário não está autenticado ou há erro na busca
   */
  getUserProfile(): Promise<User>;

  /**
   * Atualiza os dados do perfil do usuário autenticado.
   *
   * @param data - Dados a serem atualizados no perfil
   * @returns Promise que resolve com a sessão atualizada do usuário
   * @throws {AuthError} Quando há erro na atualização do perfil
   */
  updateProfile(data: UpdateProfileData): Promise<UserSession>;
}
