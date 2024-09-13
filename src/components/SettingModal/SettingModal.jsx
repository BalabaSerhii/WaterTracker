import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import IconComponent from "../IconComponent/IconComponent";
import css from "./SettingModal.module.css";
import Modal from "../Modal/Modal";

export default function SettingModal({onClose, isOpen, setIsOpen}) {
    
    let userData = []
    let ShowCurrentPassword = []
    let showNewPassword = []
    let showConfirmNewPassword = []
    let userSchema = []
    let handleSubmit = []
    let preview = []
    let handleButtonClick = []

    
    return (
        <Modal modalTitle="Setting" onClose={onClose} isOpen={isOpen} setIsOpen={setIsOpen}>
            <div className={css.modal} onClick={(e) => e.stopPropagation()}>
                <div className={css.modalContent}>
                    <Formik
                        initialValues={{
                            gender: userData.gender || "woman",
                            userName: userData.userName || "",
                            email: userData.email || "",
                            currentPassword: "",
                            newPassword: "",
                            confirmNewPassword: "",
                        }}
                        validationSchema={userSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ errors, touched, setFieldValue }) => (
                            <Form>
                                <label className={css.label}>Your photo</label>
                                <div className={css.photoUploadBox}>
                                    <div className={css.photoUploadContainer}>
                                        {preview ? (
                                            <div className={css.avatarPreviewWrapper}>
                                                <img
                                                    src={preview}
                                                    alt="Avatar Preview"
                                                    className={css.avatar}
                                                />
                                            </div>
                                        ) : (
                                            getAvatarContent()
                                        )}
                                    </div>

                                    <button
                                        type="button"
                                        aria-label="Upload"
                                        className={css.uploadButton}
                                        onClick={handleButtonClick}
                                    >
                                        <input
                                            type="file"
                                            name="avatar"
                                            id="fileInput"
                                            accept="image/png, image/jpeg"
                                            hidden
                                            onChange={(e) => handleAvatarChange(e, setFieldValue)}
                                        />
                                        <ErrorMessage
                                            name="avatar"
                                            component="p"
                                            className={css.error}
                                        />
                                        <IconComponent id="arrow-up" width={16} height={16} />
                                        Upload a photo
                                    </button>
                                </div>

                                <div className={css.inputGroup}>
                                    <div className={css.input1}>
                                        <div className={css.formGroup}>
                                            <label className={css.label}>Your gender identity</label>
                                            <div className={css.gender}>
                                                <label>
                                                    <Field type="radio" name="gender" value="Woman" /> Woman
                                                </label>
                                                <label>
                                                    <Field type="radio" name="gender" value="Man" /> Man
                                                </label>
                                                <ErrorMessage
                                                    name="gender"
                                                    component="p"
                                                    className={css.error}
                                                />
                                            </div>
                                        </div>

                                        <div className={css.formGroup}>
                                            <label className={css.label}>Your name</label>
                                            <Field
                                                className={css.input}
                                                type="text"
                                                name="userName"
                                                placeholder="Enter your name"
                                            />
                                            <ErrorMessage
                                                name="userName"
                                                component="div"
                                                className={css.error}
                                            />
                                        </div>

                                        <div className={css.formGroup}>
                                            <label className={css.label}>E-mail</label>
                                            <Field
                                                className={`${css.input} ${errors.email && touched.email ? css.inputError : ""
                                                    }`}
                                                type="email"
                                                name="email"
                                                placeholder="Enter your email"
                                            />
                                            <ErrorMessage
                                                name="email"
                                                component="div"
                                                className={`${css.error} ${css.errorMessageEmail}`}
                                            />
                                        </div>
                                    </div>

                                    <div className={css.input2}>
                                        <div className={css.formGroup}>
                                            <label className={css.label}>Password</label>
                                            <p className={css.outdatedPassword}>Outdated password:</p>
                                            <div className={css.inputWrap}>
                                                <Field
                                                    className={`${css.input} ${errors.currentPassword && touched.currentPassword
                                                            ? css.inputError
                                                            : ""
                                                        }`}
                                                    type={ShowCurrentPassword ? "text" : "password"}
                                                    name="currentPassword"
                                                    placeholder="Password"
                                                />
                                                <button
                                                    className={css.buttonSvg}
                                                    aria-label="Show password"
                                                    type="button"
                                                    onClick={() =>
                                                        setShowCurrentPassword(!ShowCurrentPassword)
                                                    }
                                                >
                                                    <IconComponent
                                                        className={css.svg}
                                                        id={ShowCurrentPassword ? `close-eye` : `open-eye`}
                                                        width={16}
                                                        height={16}
                                                    />
                                                </button>
                                            </div>
                                            <ErrorMessage
                                                name="currentPassword"
                                                component="div"
                                                className={css.error}
                                            />
                                        </div>

                                        <div className={css.formGroup}>
                                            <label>New Password:</label>
                                            <div className={css.inputWrap}>
                                                <Field
                                                    className={`${css.input} ${errors.newPassword && touched.newPassword
                                                            ? css.inputError
                                                            : ""
                                                        }`}
                                                    type={showNewPassword ? `text` : `password`}
                                                    name="newPassword"
                                                    placeholder="Password"
                                                />
                                                <button
                                                    className={css.buttonSvg}
                                                    aria-label="Show password"
                                                    type="button"
                                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                                >
                                                    <IconComponent
                                                        className={css.svg}
                                                        id={showNewPassword ? `close-eye` : `open-eye`}
                                                        width={16}
                                                        height={16}
                                                    />
                                                </button>
                                            </div>
                                            <ErrorMessage
                                                name="newPassword"
                                                component="div"
                                                className={css.error}
                                            />
                                        </div>

                                        <div className={css.formGroup}>
                                            <label>Repeat new password:</label>
                                            <div className={css.inputWrap}>
                                                <Field
                                                    className={`${css.input} ${errors.confirmNewPassword &&
                                                            touched.confirmNewPassword
                                                            ? css.inputError
                                                            : ""
                                                        }`}
                                                    type={showConfirmNewPassword ? "text" : "password"}
                                                    name="confirmNewPassword"
                                                    placeholder="Password"
                                                />
                                                <button
                                                    className={css.buttonSvg}
                                                    aria-label="Show password"
                                                    type="button"
                                                    onClick={() =>
                                                        setShowConfirmNewPassword(!showConfirmNewPassword)
                                                    }
                                                >
                                                    <IconComponent
                                                        className={css.svg}
                                                        id={showConfirmNewPassword ? `close-eye` : `open-eye`}
                                                        width={16}
                                                        height={16}
                                                    />
                                                </button>
                                            </div>
                                            <ErrorMessage
                                                name="confirmNewPassword"
                                                component="div"
                                                className={`${css.error} ${css.errorMessage}`}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className={css.contBtn}>
                                    <button
                                        className={css.saveBtn}
                                        type="submit"
                                        aria-label="Submit"
                                    >
                                        Save
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </Modal>
    );
}
